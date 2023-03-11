import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from './Searchbar.module.css';
class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  onChangeInput = evt => {
    this.setState({ query: evt.currentTarget.value });
  };

  onSubmitForm = evt => {
    evt.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    if (query.trim() === '') {
      toast.info('Enter a search term.');
      return;
    }

    onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmitForm}>
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
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
