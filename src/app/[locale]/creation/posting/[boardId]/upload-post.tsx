'use client';

import React, { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useMutation } from '@tanstack/react-query';
import { useFileUpload } from '@/hooks/use-file-upload';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import SimpleCard from '@/components/SimpleCard';

import 'react-quill/dist/quill.snow.css';
import { uploadPost } from '@/lib/fetcher';

interface PostingType {
  boardId: number;
  authorUuid: string;
  title: string;
  contents: string;
  withImage: boolean;
}

// const REGION = process.env.AWS_REGION;
// const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
// const SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY_ID;
// const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// console.log(REGION, ACCESS_KEY, SECRET_ACCESS_KEY, BUCKET_NAME);
//TODO: boardId 받아오기
const Posting = ({ boardId }: { boardId: number }) => {
  const [title, setTitle] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [withImage, isWithImage] = useState(false);
  const uploadFile = useFileUpload();
  const session = useSession();
  const quillRef = useRef<ReactQuill>(null);
  const path = usePathname();

  const bId = Number(path.split('/')[3]);

  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(uploadPost);

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        return; // 파일이 선택되지 않은 경우 종료
      }

      // const file = input.files[0];
      console.log(input);

      const file = {
        preview: URL.createObjectURL(input.files[0]),
        data: input.files[0],
      };
      try {
        console.log(file.data.name);
        const upload = await uploadFile(file.data.name, file.data);

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection()?.index;
          if (range != null) {
            editor.insertEmbed(range, 'image', upload.filepath);
          }
        }

        isWithImage(true);
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    };
  };
  

  // Quill.register('modules/imageHandler', imageHandler);

  // QUILL 모듈
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic'],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleQuillChange = (contentValue: string) => {
    setContentValue(contentValue);
  };

  const handleSubmit = () => {
    const newPosting: PostingType = {
      boardId: bId,
      authorUuid: session.data?.user.uuid as string,
      title: title,
      contents: contentValue,
      withImage: withImage,
    };

    console.log(newPosting);
    mutate(newPosting);
  };

  return (
    <>
      <SimpleCard
        title="Create a post"
        classNames={{ base: 'min-h-[450px] h-full' }}
      >
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            variant="bordered"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={contentValue}
            modules={modules}
            onChange={handleQuillChange}
          />

          <div className="flex justify-end gap-2">
            <Button onClick={() => window.history.back()} color="secondary">
              Cancel
            </Button>

            <Button color="primary" onClick={handleSubmit}>
              Post
            </Button>
          </div>
        </div>
      </SimpleCard>

      {/* <div // signedUrl 확인
      >{contentValue}</div> */}
    </>
  );
};

export default Posting;
