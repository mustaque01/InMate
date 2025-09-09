# Contributing to InMate 🤝

Thank you for considering contributing to InMate! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Basic knowledge of Next.js, React, and TypeScript

### Setting Up Development Environment

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork: `git clone https://github.com/your-username/InMate.git`

2. **Install dependencies**
   ```bash
   cd InMate
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Update .env.local with your configuration
   ```

4. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add proper type annotations
- Write self-documenting code

### Git Workflow
1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Commit with clear messages: `git commit -m "Add: new feature description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Create a Pull Request

### Commit Message Format
```
Type: Brief description

Detailed explanation (if needed)

Types:
- Add: New feature
- Fix: Bug fix
- Update: Existing feature modification
- Remove: Code removal
- Docs: Documentation changes
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment details (OS, browser, Node version)

## 💡 Feature Requests

For new features:
- Describe the feature clearly
- Explain the use case and benefits
- Provide mockups/examples if possible
- Consider implementation complexity

## 🧪 Testing

- Test your changes thoroughly
- Ensure existing functionality still works
- Add tests for new features when possible
- Test on different screen sizes

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments for new functions
- Update API documentation for new endpoints
- Include examples in documentation

## 🔍 Code Review Process

1. All submissions require review
2. Reviews focus on:
   - Code quality and style
   - Functionality and logic
   - Performance implications
   - Security considerations
   - Documentation completeness

## 📁 Project Structure

```
InMate/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── student/           # Student pages
│   └── auth/              # Auth pages
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── admin/             # Admin components
│   └── auth/              # Auth components
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── contexts/              # React contexts
└── prisma/                # Database schema
```

## 💻 Areas for Contribution

### High Priority
- 🐛 Bug fixes
- 📱 Mobile responsiveness improvements
- ♿ Accessibility enhancements
- 🔐 Security improvements

### Medium Priority
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 📊 New dashboard features
- 🧪 Test coverage

### Future Features
- 📧 Email notifications
- 📱 Mobile app
- 🌐 Internationalization
- 🔄 Real-time features

## ❓ Questions?

- Open an issue for discussion
- Check existing issues first
- Join our community discussions
- Email: mustakarman560@gmail.com

## 🏆 Recognition

Contributors will be:
- Added to README.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing to InMate! 🚀
