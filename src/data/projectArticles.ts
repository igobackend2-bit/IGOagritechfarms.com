// Combined lookup of long-form SEO article content for project detail pages,
// keyed by full route path (e.g. "/projects/agri/open-field/dragon-fruit").
// Content supplied by the marketing team. Split across several files by
// category purely to keep individual files a manageable size — this file just
// merges them. Consumed by ProjectRouter.tsx via <ProjectArticleSection>.
//
// NOTE: this is being populated in batches. Only routes present as keys will
// show the extra article section; every other page is unaffected.

import { PROJECT_ARTICLES_AGRI_1 } from "./projectArticlesAgri1";
import { PROJECT_ARTICLES_AGRI_2 } from "./projectArticlesAgri2";
import { PROJECT_ARTICLES_FLORICULTURE } from "./projectArticlesFloriculture";
import { PROJECT_ARTICLES_MUSHROOM } from "./projectArticlesMushroom";
import { PROJECT_ARTICLES_URBAN } from "./projectArticlesUrban";
import { PROJECT_ARTICLES_NURSERY } from "./projectArticlesNursery";
import { PROJECT_ARTICLES_AQUACULTURE } from "./projectArticlesAquaculture";
import { PROJECT_ARTICLES_LIVESTOCK } from "./projectArticlesLivestock";
import { PROJECT_ARTICLES_ENGINEERING } from "./projectArticlesEngineering";

export const PROJECT_ARTICLES: Record<string, string> = {
  ...PROJECT_ARTICLES_AGRI_1,
  ...PROJECT_ARTICLES_AGRI_2,
  ...PROJECT_ARTICLES_FLORICULTURE,
  ...PROJECT_ARTICLES_MUSHROOM,
  ...PROJECT_ARTICLES_URBAN,
  ...PROJECT_ARTICLES_NURSERY,
  ...PROJECT_ARTICLES_AQUACULTURE,
  ...PROJECT_ARTICLES_LIVESTOCK,
  ...PROJECT_ARTICLES_ENGINEERING,
};
