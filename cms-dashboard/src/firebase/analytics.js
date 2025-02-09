import { getAnalytics, logEvent } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import app from './index';

// Initialize Analytics
export const analytics = getAnalytics(app);

// Initialize Performance Monitoring
export const perf = getPerformance(app);

// Custom analytics events
export const logCustomEvent = (eventName, eventParams) => {
  logEvent(analytics, eventName, eventParams);
};

// Common analytics events
export const analyticsEvents = {
  postCreated: (postTitle) => {
    logEvent(analytics, 'post_created', {
      title: postTitle,
      timestamp: new Date().toISOString()
    });
  },
  postPublished: (postTitle) => {
    logEvent(analytics, 'post_published', {
      title: postTitle,
      timestamp: new Date().toISOString()
    });
  },
  postViewed: (postTitle) => {
    logEvent(analytics, 'post_viewed', {
      title: postTitle,
      timestamp: new Date().toISOString()
    });
  },
  categoryViewed: (categoryName) => {
    logEvent(analytics, 'category_viewed', {
      category: categoryName,
      timestamp: new Date().toISOString()
    });
  },
  searchPerformed: (searchTerm) => {
    logEvent(analytics, 'search_performed', {
      term: searchTerm,
      timestamp: new Date().toISOString()
    });
  }
};