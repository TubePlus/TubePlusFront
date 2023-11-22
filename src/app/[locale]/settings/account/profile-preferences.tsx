import { useFileUpload } from '@/hooks/use-file-upload';
import useGlobalState from '@/hooks/use-global-state';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

/**
 * @description 파일 경로, preSignedUrl 등 세부적인 조정을 위해 app/api/upload를 확인
 * @returns
 */
const ProfilePreference = () => {
  const { data: session } = useSession();
  const [user, setUser] = useGlobalState('/settings');
  const [username, setUsername] = useState(session?.user.username);
  const [bio, setBio] = useState(session?.user.bio || '');

  const profileRef = useRef<HTMLInputElement | null>(null);
  const uploadFile = useFileUpload();
  const [file, setFile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState(session?.user.image);

  const handleProfile = async (e: any) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setFile(img);
    if (file) {
      console.log(file.data.name);
      const upload = await uploadFile(file.data.name, file.data);

      console.log(file);
      console.log(upload);
      if (upload.ok) {
        // show success
        setProfileImage(upload.filepath);
        // TODO: pforile filepath(upload)를 db에 fetch
        // TODO: session update
        alert('upload ok');
        // 성공하면 url state를 설정하고, globalstate에 저장
      } else {
        // show error
        alert('upload error');
      }
    }
  };

  useEffect(() => {
    const updatedUser = {
      ...user,
      editable: {
        uuid: session?.user.uuid,
        username: username || session?.user.username,
        profileImage: profileImage || session?.user.image,
        locale: session?.user.locale,
        bio: bio || '',
      },
    };
    setUser(updatedUser);
    console.log(user);
  }, [bio, profileImage, username]);

  return (
    <div className="px-6 pb-6 flex flex-col gap-2 items-center border-b-1 border-default-300">
      <div className="grid grid-cols-4 flex-row items-center gap-10 w-full text-sm">
        <div className="col-span-1 x:hidden md:flex justify-center relative">
          <div className="relative aspect-square w-[200px]">
            <Avatar
              classNames={{
                base: 'w-full h-full border border-default-300',
              }}
              src={
                file
                  ? file.preview
                  : user?.image
                  ? user?.image
                  : (session?.user.image as string)
              }
              alt={session?.user.name as string}
            />

            <Button
              type="button"
              startContent={<Pencil1Icon />}
              className="absolute md:bottom-[5%] md:right-[1%] x:bottom-0 x:right-0 z-20 border border-default-600 shadow-none hover:shadow-md duration-300"
              size="sm"
              onClick={() => {
                // console.log('이미지 수정!');
                profileRef.current?.click();
              }}
            >
              Edit
            </Button>
            <input
              type="file"
              className="hidden"
              onInput={handleProfile}
              ref={profileRef}
            />
          </div>
        </div>
        <div className="md:col-span-3 x:col-span-full flex flex-col gap-4">
          {/* TODO: 위 avatar로 대체 */}
          {/* <UsernameInput className="" currentUser={user} /> */}

          <div className="flex flex-row gap-4">
            <Avatar
              className="md:hidden"
              classNames={{
                base: 'h-[64px] w-[64px] border border-default-300',
              }}
              src={
                file
                  ? file.preview
                  : user?.image
                  ? user?.image
                  : (session?.user.image as string)
              }
              alt={session?.user.name as string}
            />
            <div className="relative col-span-3 flex flex-col w-full">
              <h5 className="col-span-1 font-semibold whitespace-nowrap">
                Username
              </h5>
              <Input
                type="text"
                variant="bordered"
                placeholder={session?.user.username}
                defaultValue={username}
                onValueChange={setUsername}
              />
            </div>
          </div>

          <div className="relative col-span-3 flex flex-col">
            <h5 className="col-span-1 font-semibold whitespace-nowrap">
              About(Bio)
            </h5>
            <Textarea
              classNames={{ input: 'mb-4' }}
              // isReadOnly
              minRows={2}
              variant="bordered"
              placeholder="Add bio..."
              value={bio}
              onValueChange={setBio}
              isInvalid={bio.length > 255}
            />
            <p className="absolute right-2 bottom-1 text-default-500 text-small">
              {bio.length}/255
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreference;
