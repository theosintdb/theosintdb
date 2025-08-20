
import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { useContent } from '../contexts/ContentContext';

const News: React.FC = () => {
    const { newsArticles, siteContent } = useContent();
    const pageText = siteContent.pages.news;

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />
            <div className="space-y-6">
                {newsArticles.length > 0 ? (
                    newsArticles.map((article) => (
                        <Card key={article.id} className="flex flex-col md:flex-row">
                            {article.imageUrl && (
                                <div className="md:w-1/4 flex-shrink-0">
                                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                                </div>
                            )}
                            <div className="p-6 flex-grow">
                                 <div className="flex justify-between items-baseline mb-2">
                                    <h2 className="text-2xl font-bold text-white">{article.title}</h2>
                                    <span className="text-sm text-gosid-gray flex-shrink-0 ml-4">{article.date}</span>
                                </div>
                                <span className="inline-block bg-gosid-gold/20 text-gosid-gold text-xs font-semibold px-2 py-1 rounded-full mb-3">{article.category}</span>
                                <p className="text-gosid-light leading-relaxed">{article.summary}</p>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card><div className="p-6 text-center text-gosid-gray">No intelligence bulletins available at this time.</div></Card>
                )}
            </div>
        </div>
    );
};

export default News;