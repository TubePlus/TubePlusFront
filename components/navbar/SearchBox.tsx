'use client';

import { Kbd } from '@nextui-org/kbd';
import { Button } from '@nextui-org/button';
import { Input, useInput } from '@nextui-org/input';
import { Divider, Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { Skeleton } from '@nextui-org/skeleton';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, {
  useEffect,
  useState,
  forwardRef,
  useMemo,
  Dispatch,
  SetStateAction,
  Ref,
  useRef,
} from 'react';
import { useIsMounted } from '@nextui-org/use-is-mounted';
import { useIsMobile } from '@nextui-org/use-is-mobile';

import { CloseFilledIcon } from '../icons/CloseFilledIcon';
import { QuickResultBox } from './QuickResultBox';

// Don't Touch This Filter Items
const SearchFilter = [
  { label: 'Creator', value: 'creator' },
  { label: 'Board', value: 'board' },
  { label: 'Post', value: 'post' },
];

/**
 *
 * @param className
 * @param type 'input' | 'button'
 *
 * @description 결합도가 상당히 높은 컴포넌트입니다.
 *              NextUI의 useInput을 활용해 직접 구현한 Input 컴포넌트이며,
 *              내부에는 NextUI의 Select, Modal, Button 등 기타 NextUI 의존성 컴포넌트가 포함되어 있습니다.
 *
 *              - 내부에서 UI를 정의합니다.
 *              - 내부에서 Data Fetching이 이루어집니다.
 *              - Development mode에서 DOMNesting error가 표시될 수 있습니다.
 * @returns
 */
const SearchBox = ({
  className,
  type = 'button',
}: {
  className?: string;
  type: 'input' | 'button';
}) => {
  const mounted = useIsMounted();
  const isMobile = useIsMobile(); // TODO: 모바일에서 검색 창 사이즈 문제

  const searchInputRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState<Selection>(
    new Set([SearchFilter[0].value]),
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  switch (type) {
    case 'input':
      return mounted ? (
        <div className="flex gap-[1px]">
          <Select
            className="max-w-[120px] mx-[-1px] z-0"
            classNames={{
              trigger: [
                'rounded-full rounded-se-none rounded-ee-none',
                'border border-1 dark:border-default-600/20 pl-4',
                'bg-zinc-200/50 dark:bg-zinc-800',
                'text-default-500',
              ],
              label: '!text-[11px]',
              value: 'leading-1',
              mainWrapper: ['h-10'],
              innerWrapper: ['pt-0'],
              popover: 'dark:bg-default-100',
            }}
            label
            selectedKeys={selectValue}
            onSelectionChange={setSelectValue}
            size="sm"
            variant="faded"
            items={SearchFilter}
          >
            {filterItem => (
              <SelectItem key={filterItem.value}>{filterItem.label}</SelectItem>
            )}
          </Select>

          <SearchInput
            placeholder="Search TubePlus"
            value={searchValue}
            onValueChange={setSearchValue}
            ref={searchInputRef}
          >
            <QuickResultBox // fetching...
              searchValue={searchValue}
              selectValue={selectValue}
            />
          </SearchInput>
        </div>
      ) : (
        <div>
          <Skeleton className="min-w-[150px] w-full h-10 rounded-full" />
        </div>
      );

    case 'button':
      return mounted ? (
        <>
          <Button
            className={`${className}`}
            variant="light"
            radius="full"
            isIconOnly
            onPress={onOpen}
          >
            <MagnifyingGlassIcon tabIndex={-1} />
          </Button>

          <Modal
            classNames={{
              wrapper: 'absolute z-[9999]',
              base: ['min-h-[280px]'],
              backdrop: 'z-[999]',
            }}
            isOpen={isOpen}
            closeButton={false}
            placement="center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              <div className="flex">
                <Select
                  className="max-w-[120px] mx-[-1px]"
                  classNames={{
                    base: 'flex-0',
                    trigger: 'rounded-se-none rounded-ee-none',
                    label: '!text-[11px]',
                    value: 'leading-1',
                    mainWrapper: 'h-10',
                    innerWrapper: 'pt-3',
                  }}
                  selectedKeys={selectValue}
                  onSelectionChange={setSelectValue}
                  radius="none"
                  size="sm"
                  items={SearchFilter}
                  label="Search Filter"
                >
                  {filterItem => (
                    <SelectItem key={filterItem.value}>
                      {filterItem.label}
                    </SelectItem>
                  )}
                </Select>
                <Input
                  classNames={{}}
                  radius="none"
                  placeholder="Search TubePlus"
                  startContent={<MagnifyingGlassIcon className="w-6 h-6" />}
                  endContent={
                    <Kbd classNames={{ content: 'text-xs' }} keys={['escape']}>
                      ESC
                    </Kbd>
                  }
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
              </div>

              <Divider />

              <ModalBody>
                {searchValue
                  ? `Search for ${Array.from(selectValue).join(
                      '',
                    )} | "${searchValue}"`
                  : 'How are you today?'}

                <QuickResultBox // fetching...
                  searchValue={searchValue}
                  selectValue={selectValue}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <div>
          <Skeleton className="w-10 h-10 rounded-full " />
        </div>
      );
  }
};

export default SearchBox;

// Custom Input: SearchInput
const className = 'border-l-0 bg-opacity-50 transition-all';
const styles = {
  base: [],
  // mainWrapper: [''],
  // label: 'text-black/50 dark:text-white/90',
  innerWrapper: ['focus-within:rounded:ee-none'],
  input: [''],
  inputWrapper: [
    'h-10 transition-colors motion-reduce:transition-none',
    'border border-1 border-l-0',
    'rounded-full rounded-ss-none rounded-es-none',
    'focus-within:rounded-se-[20px] focus-within:rounded-ee-none',
    'border-default-200 hover:border-default-400',
    'bg-opacity-10 hover:bg-transparent focus-within:!bg-transparent',
  ],
};

export const SearchInput = forwardRef(
  ({
    children,
    // TODO: warning ref(Warning: forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?)
    // NOTE: https://deepscan.io/docs/rules/react-useless-forward-ref
    ...props
  }: {
    value: string;
    onValueChange: Dispatch<SetStateAction<string>>;
    placeholder: string;
    children: React.ReactNode;
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
  }) => {
    const {
      Component,
      domRef,
      description,
      isClearable,
      startContent,
      endContent,
      errorMessage,
      getBaseProps,
      getInputProps,
      getInnerWrapperProps,
      getInputWrapperProps,
      getDescriptionProps,
      getErrorMessageProps,
      getClearButtonProps,
    } = useInput({
      ...props,
      classNames: { ...styles },
      startContent: (
        <MagnifyingGlassIcon className="flex-shrink-0 pointer-events-none" />
      ),
    });
    const [showQuickResult, setShowQuickResult] = useState(false);

    const end = useMemo(() => {
      if (isClearable) {
        return (
          <span {...getClearButtonProps()}>
            {endContent || <CloseFilledIcon />}
          </span>
        );
      }

      return endContent;
    }, [isClearable, endContent, getClearButtonProps]);

    const innerWrapper = useMemo(() => {
      if (startContent || end) {
        return (
          <div {...getInnerWrapperProps()}>
            {startContent}
            <input {...getInputProps()} />
            {end}
          </div>
        );
      }

      return <input {...getInputProps()} />;
    }, [startContent, end, getInputProps, getInnerWrapperProps]);

    return (
      <>
        <Component {...getBaseProps()}>
          <div
            {...getInputWrapperProps()}
            role="button"
            onClick={() => {
              domRef.current?.focus();
              setShowQuickResult(true); // focus 시에만 children 표시
            }}
          >
            {innerWrapper}
          </div>
          {description && <div {...getDescriptionProps()}>{description}</div>}
          {errorMessage && (
            <div {...getErrorMessageProps()}>{errorMessage}</div>
          )}
          {showQuickResult && children}
        </Component>
      </>
    );
  },
);
SearchInput.displayName = 'SearchInput';
