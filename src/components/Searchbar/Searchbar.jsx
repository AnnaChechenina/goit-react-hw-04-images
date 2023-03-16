import { useState } from 'react';

import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onChangeInput = evt => {
    const { value } = evt.target;
    setQuery(value.toLowerCase());
  };

  const onSubmitForm = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      toast.info('Enter a search term.');
      return;
    }

    onSubmit(query);
    reset();
  };
  const reset = () => {
    setQuery('');
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onSubmitForm}>
        <button className={css.button} type="submit">
          <FaSearch size={12} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
}

export default Searchbar;
