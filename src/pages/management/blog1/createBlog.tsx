/* eslint-disable jsx-a11y/label-has-associated-control */
import { DropboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddContentModal({ onClose }: AddContentModalProps) {
  const [contentType, setContentType] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Add New Content</h1>

      <div className="mb-1">
        <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="content-heading">
          Content Heading
        </label>
        <input
          id="content-heading"
          type="text"
          placeholder="Content Heading"
          className="focus:ring-blue-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
        />
      </div>

      <div className="mb-1">
        <label className="mb-2 block text-sm font-medium text-gray-700">Content Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="contentType"
              value="News"
              onChange={(e) => setContentType(e.target.value)}
              className="form-radio text-blue-600 h-4 w-4"
            />
            <span className="text-gray-700">News</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="contentType"
              value="Blog"
              onChange={(e) => setContentType(e.target.value)}
              className="form-radio text-blue-600 h-4 w-4"
            />
            {contentType}
            <span className="text-gray-700">Blog</span>
          </label>
        </div>
      </div>

      <div className="mb-1">
        <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Write Something Awesome....."
          className="focus:ring-blue-200 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring"
          rows={3}
        />
      </div>

      <div className="mb-1">
        <label className="mb-1 block text-sm font-medium text-gray-700">Documents</label>
        <div className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-200 p-2 text-center">
          <DropboxOutlined style={{ fontSize: '48px' }} />
          <p className="font-bold text-black">Select files</p>
          <p className="cursor-pointer text-gray-800">
            Drop files here or click to browse your machine
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-700">File selected: {selectedFile.name}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button className="text-white rounded-lg bg-gray-400 px-4 py-2" onClick={onClose}>
          Cancel
        </button>
        <button className="bg-red-500 text-white rounded-lg px-4 py-2">Post</button>
      </div>
    </div>
  );
}

export default AddContentModal;
