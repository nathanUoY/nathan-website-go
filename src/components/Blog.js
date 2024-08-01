import React, { useState, useEffect } from 'react';
import '../styles/Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [createPassword, setCreatePassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [newPost, setNewPost] = useState({ heading: '', content: '', image: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/blog-api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleCreatePasswordSubmit = (e) => {
    e.preventDefault();
    if (createPassword === 'blog') {
      setShowCreateForm(true);
      setActiveForm(null);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDeletePasswordSubmit = (e) => {
    e.preventDefault();
    if (deletePassword === 'del') {
      setShowDeleteForm(true);
      setActiveForm(null);
    } else {
      alert('Incorrect password');
    }
  };

  const handleEditPasswordSubmit = (e, post) => {
    e.preventDefault();
    if (editPassword === 'edit') {
      setNewPost({ heading: post.heading, content: post.content, image: post.image });
      setEditingPostId(post._id);
      setShowCreateForm(true);
      setActiveForm(null);
    } else {
      alert('Incorrect password');
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/blog-api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ heading: '', content: '', image: '' });
      setShowCreateForm(false);
      setCreatePassword('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/blog-api/posts/${editingPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts(posts.map(post => (post._id === editingPostId ? data : post)));
      setNewPost({ heading: '', content: '', image: '' });
      setShowCreateForm(false);
      setEditingPostId(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:5000/blog-api/posts/${postId}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post._id !== postId));
      setShowDeleteForm(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDelete = (postId, heading) => {
    if (window.confirm(`Delete "${heading}", are you sure?`)) {
      handleDeletePost(postId);
    }
  };

  const activateCreate = () => {
    setActiveForm('create');
    setShowCreateForm(false);
    setShowDeleteForm(false);
    setCreatePassword('');
    setDeletePassword('');
    setEditPassword('');
    setNewPost({ heading: '', content: '', image: '' });
    setEditingPostId(null);
  };

  const activateDelete = () => {
    setActiveForm('delete');
    setShowCreateForm(false);
    setShowDeleteForm(false);
    setCreatePassword('');
    setDeletePassword('');
    setEditPassword('');
    setNewPost({ heading: '', content: '', image: '' });
    setEditingPostId(null);
  };

  const activateEdit = (post) => {
    setActiveForm('edit');
    setShowCreateForm(false);
    setShowDeleteForm(false);
    setCreatePassword('');
    setDeletePassword('');
    setEditPassword('');
    setNewPost({ heading: post.heading, content: post.content, image: post.image });
    setEditingPostId(post._id);
  };

  return (
    <div className="blog">
      <div className="blog-header">
        <div className="header-item">
          <button className="delete-post-button" onClick={activateDelete}>Delete Post</button>
          {activeForm === 'delete' && !showDeleteForm && (
            <form onSubmit={handleDeletePasswordSubmit} className="password-form">
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter password"
              />
              <button type="submit" className="text-button">Submit</button>
            </form>
          )}
        </div>
        <h1 className="blog-title">Blog</h1>
        <div className="header-item">
          <button className="create-post-button" onClick={activateCreate}>Create Post</button>
          {activeForm === 'create' && !showCreateForm && (
            <form onSubmit={handleCreatePasswordSubmit} className="password-form">
              <input
                type="password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder="Enter password"
              />
              <button type="submit" className="text-button">Submit</button>
            </form>
          )}
        </div>
      </div>
      {showCreateForm && (
        <form onSubmit={editingPostId ? handleEditPost : handleCreatePost} className="create-form">
          <h2>{editingPostId ? 'Edit Post' : 'Create Post'}</h2>
          <input
            type="text"
            value={newPost.heading}
            onChange={(e) => setNewPost({ ...newPost, heading: e.target.value })}
            placeholder="Heading"
            required
            className="input-field"
          />
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Content"
            required
            className="input-field"
          />
          <input
            type="text"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            placeholder="Image URL"
            className="input-field"
          />
          <button type="submit">{editingPostId ? 'Submit Edit' : 'Create'}</button>
        </form>
      )}
      {showDeleteForm && (
        <div className="delete-form">
          <h2>Select post to be deleted</h2>
          {posts.map(post => (
            <p key={post._id} onClick={() => confirmDelete(post._id, post.heading)}>
              {post.heading}
            </p>
          ))}
        </div>
      )}
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <h2>{post.heading}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.heading} />}
            <p className="update-post-button" onClick={() => activateEdit(post)}>Update Post</p>
            {activeForm === 'edit' && editingPostId === post._id && (
              <form onSubmit={(e) => handleEditPasswordSubmit(e, post)} className="password-form">
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button type="submit" className="text-button">Submit</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
