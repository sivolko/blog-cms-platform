import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlogEditor from '../../components/BlogEditor';

describe('BlogEditor Component', () => {
  it('renders blog editor form', () => {
    const { getByPlaceholderText } = render(<BlogEditor />);
    
    expect(getByPlaceholderText('Post Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Write your post content in Markdown...')).toBeInTheDocument();
  });

  it('updates title on input change', () => {
    const { getByPlaceholderText } = render(<BlogEditor />);
    const titleInput = getByPlaceholderText('Post Title');
    
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
    expect(titleInput.value).toBe('Test Title');
  });
});