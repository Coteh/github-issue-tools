import React from 'react';
import 'jest';
import { render, fireEvent } from '@testing-library/react';
import { RepositorySelect } from './RepositorySelect';

describe('RepositorySelect', () => {
  it('renders without crash', () => {
    render(<RepositorySelect repoNames={[]} loading={false} />);
  });
  it('indicates that repositories are loading when loading prop is set to true', () => {
    const { getByText } = render(
      <RepositorySelect repoNames={[]} loading={true} />,
    );

    getByText('Loading', {
      exact: false,
    });
  });
  it('indicates to select repository from dropdown when loading prop is set to false', () => {
    const { getByText } = render(
      <RepositorySelect repoNames={[]} loading={false} />,
    );

    getByText(/select.*repository/i);
  });
  it('shows supplied repository names in dropdown', () => {
    const { getByText } = render(
      <RepositorySelect repoNames={['option 1', 'option 2']} loading={false} />,
    );

    getByText('option 1');
    getByText('option 2');
  });
  it('triggers onRepoSelect callback when repository is selected from dropdown', () => {
    const stub = jest.fn();

    const { getByTestId } = render(
      <RepositorySelect
        repoNames={['option 1', 'option 2']}
        loading={false}
        onRepoSelect={stub}
      />,
    );

    expect(stub).toHaveBeenCalledTimes(0);

    fireEvent.change(getByTestId('repo-select'), {
      target: {
        value: 'option 1',
      },
    });

    expect(stub).toHaveBeenCalledTimes(1);
  });
  it('passes repository name to onRepoSelect callback', () => {
    const stub = jest.fn();

    const { getByTestId } = render(
      <RepositorySelect
        repoNames={['option 1', 'option 2']}
        loading={false}
        onRepoSelect={stub}
      />,
    );

    fireEvent.change(getByTestId('repo-select'), {
      target: {
        value: 'option 1',
      },
    });

    expect(stub).toHaveBeenCalledWith('option 1');
  });
  it("passes empty string to onRepoSelect callback when 'Please select' option is selected", () => {
    const stub = jest.fn();

    const { getByTestId } = render(
      <RepositorySelect
        repoNames={['option 1', 'option 2']}
        loading={false}
        onRepoSelect={stub}
      />,
    );

    fireEvent.change(getByTestId('repo-select'), {
      target: {
        value: '',
      },
    });

    expect(stub).toHaveBeenCalledWith('');
  });
});
