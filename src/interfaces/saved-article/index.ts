import { ArticleInterface } from 'interfaces/article';
import { SubscriberInterface } from 'interfaces/subscriber';
import { GetQueryInterface } from 'interfaces';

export interface SavedArticleInterface {
  id?: string;
  article_id: string;
  subscriber_id: string;
  created_at?: any;
  updated_at?: any;

  article?: ArticleInterface;
  subscriber?: SubscriberInterface;
  _count?: {};
}

export interface SavedArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  article_id?: string;
  subscriber_id?: string;
}
