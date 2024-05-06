package com.example.testeditions.Services;


import com.example.testeditions.Entites.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
    Post getPostById(Long id);
    Post createPost(Post post);
    Post updatePost(Long id, Post post);
    void deletePost(Long id);
    Post addPostByUser(Long userId, Post post);
}
