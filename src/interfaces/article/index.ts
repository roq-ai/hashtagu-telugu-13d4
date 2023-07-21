import { SavedArticleInterface } from 'interfaces/saved-article';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  sector: string;
  publisher_id: string;
  created_at?: any;
  updated_at?: any;
  saved_article?: SavedArticleInterface[];
  publisher?: PublisherInterface;
  _count?: {
    saved_article?: number;
  };
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  sector?: string;
  publisher_id?: string;
}
