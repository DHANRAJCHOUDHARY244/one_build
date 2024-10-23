// Define types for the article props
interface Article {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  date: string;
}

// Define the props for the ArticleList component
interface ArticleListProps {
  articles: Article[];
}

function ArticleList({ articles }: ArticleListProps) {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="flex space-x-4">
          <img src={article.imgSrc} alt="Article" className="h-32 w-32 rounded object-cover" />
          <div>
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="text-gray">{article.description}</p>
            <div className="text-sm text-gray-600">
              <span>Monday | {article.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleList;
