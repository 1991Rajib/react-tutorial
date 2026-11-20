# Document Metadata in React 19

## ✍️ How to Write It
In React 19, support for rendering document metadata tags—such as `<title>`, `<meta>`, and `<link>`—is built directly into core React JSX!

```jsx
function BlogPost({ post }) {
  return (
    <article>
      {/* React 19 automatically hoists these tags to the HTML <head>! */}
      <title>{post.title} | My Tech Blog</title>
      <meta name="description" content={post.summary} />
      <meta name="author" content={post.author} />
      <link rel="canonical" href={post.url} />

      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## 🛠️ Step-by-Step Implementation Recipe
1. Add `<title>`, `<meta>`, or `<link>` anywhere in your component's JSX.
2. React identifies them and hoists them into the document's `<head>`.
3. When the component unmounts or changes, React automatically updates or cleans up the metadata in `<head>`.

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Installing `react-helmet` or `react-helmet-async` in React 19 projects.
- ✅ **Fix:** React 19 handles document metadata natively without third-party dependencies.
