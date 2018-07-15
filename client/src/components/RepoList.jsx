import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => (
      <div key={repo.id}>
        <div>
          {repo.full_name}
        </div>
        <div>
          {repo.url}
        </div>
        <div>
          {repo.description}
        </div>
        <div>
          {repo.forks}
        </div>
        {repo.watchers}
      </div>
    ))}
  </div>
)

export default RepoList;