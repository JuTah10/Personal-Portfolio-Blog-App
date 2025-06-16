"use client"
import React from 'react'
import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from './ui/avatar'
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";

import BlogUploadImage from './BlogUploadImage';

import toast from 'react-hot-toast';

import { createPost } from '@/actions/post';


export default function CreateNewPost({ user }) {
  const [content, setContent] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  const [showImageUpload, setShowImageUpload] = React.useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;

    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result.success) {
        setContent("");
        setImageUrl("");
        setShowImageUpload(false);
        toast.success("Uploaded New Post");
      }
    } catch (error) {
      console.error("Error in handSubmit - CreateNewPost", error);
      toast.error("Failed to post. Try again!");
    } finally {
      setIsPosting(false);
    }
  }
  return (
    <Card className="mb-6">
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image} />
            </Avatar>
            <Textarea

              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base !bg-card"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <BlogUploadImage
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
