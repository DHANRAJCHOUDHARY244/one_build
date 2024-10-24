/* eslint-disable react/jsx-no-useless-fragment */

import ArticleList from './blogItem';
import { useRouter } from '@/router/hooks';

function Blog() {
  const { push } = useRouter();
  return (
        <section className="text-white p-4">
          <section className="bg-white mb-4 flex items-center justify-between rounded-lg p-4 shadow-lg">
            <div>
              <h2 className="text-lg font-semibold text-black">Create new News or Blog</h2>
              <p className="text-gray-800">Tap on the button to add new Blog or News</p>
            </div>
            <button
              className="rounded-lg bg-gradient-to-r from-[#9d2721] to-[#be2119] px-6 py-2 text-[white] shadow-md hover:bg-[#9D2721]"
              onClick={() => push("/management/create-blog")}
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
            <ArticleList />
          </div>
        </section>
  );
}

export default Blog;
