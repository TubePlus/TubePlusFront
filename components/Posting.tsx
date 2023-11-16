'use client'

import React, { useState, useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl, endpointPrefix } from '@/lib/fetcher';
import { useSession } from 'next-auth/react';
import AWS from 'aws-sdk'
import Image from 'next/image'

interface PostingType {
  boardId: string;
  authorUuid: string;
  title: string;
  contents: string;
}

const REGION = process.env.NEXT_PUBLIC_REACT_APP_AWS_S3_BUCKET_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_REACT_APP_AWS_S3_BUCKET_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_REACT_APP_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.NEXT_PUBLIC_REACT_APP_AWS_S3_BUCKET_NAME;

//TODO: boardId 받아오기
const Posting = ( { boardId }: { boardId:string }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('')
  const [contentValue, setContentValue] = useState('')
  const session = useSession();
  const quillRef = useRef<ReactQuill>(null);

  // 게시물 POST 요청 로직
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
  
  // QUILL 모듈
  const modules = useMemo(() => ({
    toolbar: [
      ['image']
    ],
    handlers: {
      image: imageHandler,
    }
  }
  ), []);

  //이미지 저장을 위한 핸들러
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  
    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        return; // 파일이 선택되지 않은 경우 종료
      }
  
      const file = input.files[0];
  
      try {
        const fileNameParts = file.name.split('.');
        const fileExtension = fileNameParts.pop();
        const name = `${Date.now()}.${fileExtension}`;
  
        AWS.config.update({
          region: REGION as string,
          accessKeyId: ACCESS_KEY as string,
          secretAccessKey: SECRET_ACCESS_KEY as string,
        });
  
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: 'public-read',
            Bucket: BUCKET_NAME as string,
            Key: name,
            Body: file,
          },
        });
  
        const uploadResult = await upload.promise();
        const IMG_URL = uploadResult.Location;
  
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection()?.index;
          if (range != null) {
            editor.insertEmbed(range, 'image', IMG_URL);
          }
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    };
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