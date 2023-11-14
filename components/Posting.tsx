'use client'

import React, { useState, useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, endpointPrefix } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import { useS3Upload } from 'next-s3-upload';

interface PostingType {
  boardId: string;
  authorUuid: string;
  title: string;
  contents: string;
}

//TODO: boardId 받아오기
const Posting = (boardId: string) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('')
  const [contentValue, setContentValue] = useState('')
  const session = useSession();
  const { uploadToS3 } = useS3Upload();

  const createPostingMutation = useMutation<any, any, PostingType>((newPosting) => {
    return fetch(`${baseUrl}${endpointPrefix}/postings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPosting),
      
    }).then((res) => res.json());
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['postings']);
    },
    onError: (error) => {
      console.error('Error creating posting:', error);
    },
  });
  
  const modules = useMemo(() => ({
    toolbar: [
      ['image']
    ],
    handlers: {
      image: imageHandler,
    }
  }
  ), []);

  
  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      try {
        const name = Date.now();
        AWS.config.update({
          region: REGION,
          accessKeyId: Access_Key,
          secretAccessKey: Secret_Access_Key,
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          ACL: 'public-read',
          Bucket: Bucket_Name,
          Key: `${name}.${file?.name.split('.').pop()}`,
          Body: file,
        },
      });

      const IMG_URL = await upload.promise().then((res) => res.Location);
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection()?.index;

      editor.insertEmbed(range, 'image', IMG_URL);
    } catch (err) {
      console.log(err);
    }
  });
};





  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const handleQuillChange = (contentValue: string) => {
    setContentValue(contentValue);
  };

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postingData: PostingType = {
      boardId: boardId,
      authorUuid: session.data?.user.uuid as string,
      title: title,
      contents: contentValue,
    }
    createPostingMutation.mutate(postingData);
  };
  
  return (
    <>
      <section className="flex flex-col col-span-3 gap-8 min-h-[300px] max-h-[80%]">
        
          <form onSubmit={handleSubmit}>
            <div className='pb-16'>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력하세요"
              style={{ width: '100%', padding: '10px' }}
              className="w-full p-3 border border-[#ccc] rounded-none  focus:outline-none focus:border-blue-300" 
            />
            <ReactQuill
              style={{ height: '500px', marginTop: '20px' }}
              theme="snow"
              value={contentValue}
              modules={modules}
              onChange={handleQuillChange}
            />
            </div>

            <div className='grid grid-cols-5 border border-[#ccc] gap-4'>
              <Button onClick={() => window.history.back()} color='secondary'>
                Cancel
              </Button>

              <Button type='submit' color='primary'>
                Post
              </Button>
            </div>


          </form>

      </section>
    </>
  );
};

export default Posting