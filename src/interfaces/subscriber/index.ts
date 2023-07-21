import { SavedArticleInterface } from 'interfaces/saved-article';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SubscriberInterface {
  id?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  saved_article?: SavedArticleInterface[];
  user?: UserInterface;
  _count?: {
    saved_article?: number;
  };
}

export interface SubscriberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
