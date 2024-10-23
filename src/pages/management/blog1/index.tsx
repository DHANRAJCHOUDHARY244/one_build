/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';

import blogImg from '@/assets/images/background/overlay_2.jpg';

import ArticleList from './blogItem';
import AddContentModal from './createBlog';

function Blog() {
  const [writeMode, setWriteMode] = useState(false);
  const articles = [
    {
      id: 1,
      imgSrc: blogImg,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Dignissim aliquam mattis quam',
      date: 'December 19, 2022',
    },
    {
      id: 2,
      imgSrc: blogImg,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Dignissim aliquam mattis quam',
      date: 'December 19, 2022',
    },
    {
      id: 3,
      imgSrc: blogImg,
      title: 'Lorem ipsum dolor sit amet consectetur.',
      description: 'Dignissim aliquam mattis quam',
      date: 'December 19, 2022',
    },
  ];

  return (
    <>
      {writeMode ? (
        <AddContentModal isOpen={writeMode} onClose={() => setWriteMode(false)} />
      ) : (
        <section className="text-white p-4">
          <section className="bg-white mb-4 flex items-center justify-between rounded-lg p-4 shadow-lg">
            <div>
              <h2 className="text-lg font-semibold text-black">Create new News or Blog</h2>
              <p className="text-gray-800">Tap on the button to add new Blog or News</p>
            </div>
            <button
              className="rounded-lg bg-gradient-to-r from-[#9d2721] to-[#be2119] px-6 py-2 text-[white] shadow-md hover:bg-[#9D2721]"
              onClick={() => setWriteMode(true)}
            >
              Create New
            </button>
          </section>
          <div className="mb-4 border-b-[2px] border-b-black">
            <span className="bg-red-600 text-white border-l-[4px] border-l-black bg-[#9D2721] px-2 py-[1px] text-sm font-bold text-[white]">
              FEATURED
            </span>
          </div>
          <div className="space-y-4">
            <ArticleList articles={articles} />
          </div>
        </section>
      )}
    </>
  );
}

export default Blog;
