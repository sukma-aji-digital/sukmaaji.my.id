---
title: "React.js Mastery: Hooks, Performance, dan Best Practices 2025"
date: "2025-09-09"
excerpt: "Panduan komprehensif React.js dengan focus pada Hooks modern, performance optimization, state management, dan best practices untuk membangun aplikasi yang scalable."
author: "Muhammad Aji Sukma"
tags: ["React", "JavaScript", "Frontend", "Hooks", "Performance"]
image: "/images/blog/react-mastery-2025.png"
---

### Artikel ini sepenuhnya ditulis oleh teknologi AI ( Claude Sonnet 4 ) dan direview Oleh Muhammad Aji Sukma

React.js telah menjadi library JavaScript paling populer untuk membangun user interfaces yang interactive dan performant. Dalam artikel ini, kita akan membahas secara mendalam tentang React modern, fokus pada Hooks, performance optimization, dan best practices yang harus dikuasai developer di 2025.

## 🎯 Mengapa React Masih Dominan di 2025?

### Keunggulan React Modern

**1. Component-Based Architecture**
React memungkinkan kita membangun UI dari komponen-komponen kecil yang reusable dan maintainable.

```jsx
// Functional Component dengan Props
const BlogCard = ({ title, excerpt, author, publishedAt, slug }) => {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">
        <Link to={`/blog/${slug}`} className="hover:text-blue-600">
          {title}
        </Link>
      </h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>By {author}</span>
        <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString()}</time>
      </div>
    </article>
  );
};
```

**2. Virtual DOM untuk Performance**
React menggunakan Virtual DOM untuk melakukan reconciliation yang efficient, update hanya komponen yang berubah.

**3. Rich Ecosystem**

- **React Router**: Client-side routing
- **Redux/Zustand**: State management
- **React Query**: Server state management
- **Next.js**: Full-stack framework
- **Testing Library**: Comprehensive testing

## 🪝 React Hooks: Modern State Management

### useState: Basic State Management

```jsx
import { useState, useEffect } from "react";

const BlogPost = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const postData = await response.json();
        setPost(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
      </header>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
};
```

### useEffect: Side Effects Management

```jsx
import { useState, useEffect, useRef } from "react";

const SearchPosts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data.results);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    // Cleanup function
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <ul className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg">
          {results.map((post) => (
            <li
              key={post.id}
              className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <h4 className="font-medium text-gray-900">{post.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### useContext: Global State Sharing

```jsx
import { createContext, useContext, useReducer } from "react";

// Theme Context
const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, isDark: !state.isDark };
    case "SET_THEME":
      return { ...state, isDark: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: JSON.parse(localStorage.getItem("isDarkTheme") || "false"),
  });

  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(state.isDark));
    document.documentElement.classList.toggle("dark", state.isDark);
  }, [state.isDark]);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });
  const setTheme = (isDark) => dispatch({ type: "SET_THEME", payload: isDark });

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// Usage dalam komponen
const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`p-4 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Blog</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isDark ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
};
```

## 🎨 Custom Hooks: Reusable Logic

### useFetch: Generic Data Fetching

```jsx
import { useState, useEffect, useCallback } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
};

// Usage
const BlogList = () => {
  const { data: posts, loading, error, refetch } = useFetch("/api/posts");

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  );
};
```

### useLocalStorage: Persistent State

```jsx
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai kita
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function untuk update localStorage dan state
  const setValue = (value) => {
    try {
      // Izinkan value berupa function seperti useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const UserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage("userPrefs", {
    fontSize: "medium",
    language: "en",
    notifications: true,
  });

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">User Preferences</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Font Size</label>
          <select
            value={preferences.fontSize}
            onChange={(e) => updatePreference("fontSize", e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) => updatePreference("notifications", e.target.checked)}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
      </div>
    </div>
  );
};
```

## ⚡ Performance Optimization

### React.memo: Prevent Unnecessary Re-renders

```jsx
import { memo, useMemo, useCallback } from "react";

// Komponen yang di-memoize
const BlogCard = memo(({ post, onLike, onShare }) => {
  console.log("BlogCard rendered for:", post.title);

  return (
    <article className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center space-x-1 px-3 py-1 rounded ${
            post.isLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          <span>❤️</span>
          <span>{post.likes}</span>
        </button>

        <button
          onClick={() => onShare(post)}
          className="flex items-center space-x-1 px-3 py-1 rounded text-gray-500 hover:text-blue-500"
        >
          <span>📤</span>
          <span>Share</span>
        </button>
      </div>
    </article>
  );
});

// Parent component dengan optimization
const BlogList = ({ posts, filters }) => {
  // Memoize filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (filters.category && post.category !== filters.category) return false;
      if (filters.search && !post.title.toLowerCase().includes(filters.search.toLowerCase()))
        return false;
      return true;
    });
  }, [posts, filters]);

  // Memoize callback functions
  const handleLike = useCallback((postId) => {
    // API call untuk like post
    likesAPI.toggle(postId);
  }, []);

  const handleShare = useCallback((post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.slug}`,
      });
    }
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post) => (
        <BlogCard key={post.id} post={post} onLike={handleLike} onShare={handleShare} />
      ))}
    </div>
  );
};
```

### useMemo & useCallback: Expensive Calculations

```jsx
import { useState, useMemo, useCallback } from "react";

const BlogAnalytics = ({ posts }) => {
  const [sortBy, setSortBy] = useState("views");
  const [filterCategory, setFilterCategory] = useState("all");

  // Expensive calculation - only recalculate when dependencies change
  const analytics = useMemo(() => {
    console.log("Calculating analytics...");

    const filtered = posts.filter(
      (post) => filterCategory === "all" || post.category === filterCategory
    );

    return {
      totalViews: filtered.reduce((sum, post) => sum + post.views, 0),
      totalLikes: filtered.reduce((sum, post) => sum + post.likes, 0),
      totalComments: filtered.reduce((sum, post) => sum + post.comments, 0),
      avgReadTime: filtered.reduce((sum, post) => sum + post.readTime, 0) / filtered.length,
      topCategories: filtered.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {}),
    };
  }, [posts, filterCategory]);

  // Memoize sort function
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "date":
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        default:
          return 0;
      }
    });
  }, [posts, sortBy]);

  // Memoize event handlers
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
  }, []);

  const handleCategoryFilter = useCallback((category) => {
    setFilterCategory(category);
  }, []);

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">
            {analytics.totalViews.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Total Likes</h3>
          <p className="text-2xl font-bold text-green-600">
            {analytics.totalLikes.toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Comments</h3>
          <p className="text-2xl font-bold text-purple-600">
            {analytics.totalComments.toLocaleString()}
          </p>
        </div>

        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-800">Avg Read Time</h3>
          <p className="text-2xl font-bold text-orange-600">
            {Math.round(analytics.avgReadTime)}min
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="views">Sort by Views</option>
          <option value="likes">Sort by Likes</option>
          <option value="date">Sort by Date</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="tech">Technology</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <PostAnalyticsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
```

## 🧪 Testing React Components

### React Testing Library

```jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import BlogCard from "../components/BlogCard";

// Mock data
const mockPost = {
  id: 1,
  title: "Test Blog Post",
  excerpt: "This is a test excerpt",
  author: "John Doe",
  publishedAt: "2025-09-09T10:00:00Z",
  slug: "test-blog-post",
  likes: 5,
  isLiked: false,
};

// Helper function untuk wrapper
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("BlogCard Component", () => {
  const mockOnLike = jest.fn();
  const mockOnShare = jest.fn();

  beforeEach(() => {
    mockOnLike.mockClear();
    mockOnShare.mockClear();
  });

  test("renders blog post information correctly", () => {
    renderWithRouter(<BlogCard post={mockPost} onLike={mockOnLike} onShare={mockOnShare} />);

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt")).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("calls onLike when like button is clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<BlogCard post={mockPost} onLike={mockOnLike} onShare={mockOnShare} />);

    const likeButton = screen.getByRole("button", { name: /❤️ 5/i });
    await user.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledWith(1);
  });

  test("calls onShare when share button is clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<BlogCard post={mockPost} onLike={mockOnLike} onShare={mockOnShare} />);

    const shareButton = screen.getByRole("button", { name: /📤 Share/i });
    await user.click(shareButton);

    expect(mockOnShare).toHaveBeenCalledWith(mockPost);
  });

  test("navigates to post detail when title is clicked", () => {
    renderWithRouter(<BlogCard post={mockPost} onLike={mockOnLike} onShare={mockOnShare} />);

    const titleLink = screen.getByRole("link", { name: "Test Blog Post" });
    expect(titleLink).toHaveAttribute("href", "/blog/test-blog-post");
  });
});

// Integration test
describe("SearchPosts Integration", () => {
  test("searches and displays results", async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              { id: 1, title: "React Hooks", excerpt: "Learn hooks", slug: "react-hooks" },
              { id: 2, title: "React Testing", excerpt: "Testing guide", slug: "react-testing" },
            ],
          }),
      })
    );

    render(<SearchPosts />);

    const searchInput = screen.getByPlaceholderText("Search posts...");

    // Type dalam search box
    await userEvent.type(searchInput, "react");

    // Wait untuk debounce dan API call
    await waitFor(() => {
      expect(screen.getByText("React Hooks")).toBeInTheDocument();
      expect(screen.getByText("React Testing")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/search?q=react");
  });
});
```

## 🏗️ Advanced Patterns

### Compound Components Pattern

```jsx
import { createContext, useContext, Children, cloneElement } from "react";

// Context untuk sharing state
const CardContext = createContext();

// Main Card component
const Card = ({ children, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CardContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>{children}</div>
    </CardContext.Provider>
  );
};

// Card subcomponents
const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-4 border-b border-gray-200 ${className}`}>{children}</div>;
};

const CardBody = ({ children, className = "" }) => {
  const { isExpanded } = useContext(CardContext);

  return <div className={`p-4 ${className} ${!isExpanded ? "hidden" : ""}`}>{children}</div>;
};

const CardToggle = ({ children, className = "" }) => {
  const { isExpanded, setIsExpanded } = useContext(CardContext);

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={`w-full text-left p-4 hover:bg-gray-50 ${className}`}
    >
      {children || (isExpanded ? "Collapse ▲" : "Expand ▼")}
    </button>
  );
};

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Toggle = CardToggle;

// Usage
const BlogPostCard = ({ post }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="text-gray-600">{post.excerpt}</p>
      </Card.Header>

      <Card.Toggle>Read More {post.readTime} min read</Card.Toggle>

      <Card.Body>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">By {post.author}</span>
          <div className="flex space-x-2">
            <LikeButton postId={post.id} />
            <ShareButton post={post} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
```

### Higher-Order Components (HOC)

```jsx
import { useState, useEffect } from "react";

// HOC untuk loading states
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <div className="animate-pulse">
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// HOC untuk error boundaries
const withErrorBoundary = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Something went wrong!</strong>
            <p className="text-sm mt-1">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Try Again
            </button>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

// Usage
const EnhancedBlogList = withErrorBoundary(withLoading(BlogList));
```

## 🌟 Kesimpulan

React.js di 2025 menawarkan ecosystem yang matang dan powerful untuk membangun aplikasi web modern. Dengan menguasai:

**Core Concepts:**

- ✅ **Functional Components** dengan Hooks
- ✅ **State Management** dengan useState, useReducer
- ✅ **Side Effects** dengan useEffect
- ✅ **Context API** untuk global state

**Performance Optimization:**

- ✅ **React.memo** untuk mencegah re-renders
- ✅ **useMemo** untuk expensive calculations
- ✅ **useCallback** untuk stable function references
- ✅ **Code Splitting** dan Lazy Loading

**Best Practices:**

- ✅ **Custom Hooks** untuk reusable logic
- ✅ **Proper Testing** dengan React Testing Library
- ✅ **Error Boundaries** untuk error handling
- ✅ **TypeScript** untuk type safety

**Advanced Patterns:**

- ✅ **Compound Components** untuk flexible APIs
- ✅ **Higher-Order Components** untuk cross-cutting concerns
- ✅ **Render Props** untuk component composition

Dengan mengikuti best practices dan patterns ini, Anda dapat membangun aplikasi React yang scalable, maintainable, dan performant. React ecosystem terus berkembang, jadi tetap update dengan perkembangan terbaru!

**Pro Tips:**

- Gunakan React DevTools untuk debugging
- Implement proper error boundaries di production
- Leverage React Query untuk server state
- Consider Next.js untuk full-stack applications
- Always write tests untuk critical components

Happy coding with React! ⚛️
