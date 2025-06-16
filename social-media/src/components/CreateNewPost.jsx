"use client"
import React from 'react'
import { Button } from './ui/button';
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from './ui/avatar'
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";


export default function CreateNewPost({ user }) {
  const [content, setContent] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  const [showImageUpload, setShowImageUpload] = React.useState(false);

  function handleSubmit() {

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

          
        </div>
      </CardContent>
    </Card>
  )
}
