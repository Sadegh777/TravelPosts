import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_MEMORY } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const MemoryList = ({
  memories,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!memories.length) {
    return <h3>Add a memory to Recall</h3>;
  }
  const [removeMemory, {error}] = useMutation(REMOVE_MEMORY, {
    update(cache, {data: {removeMemory}}) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me:removeMemory},
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveMemory = async (memory) => {
    try {
      const { data } = await removeMemory({
        variables: { memory},
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {memories &&
        memories.map((memory) => (
          <div key={memory._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/user/${memory.memoryAuthor}`}
                >
                  {memory.memoryAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Experienced this memory on {memory.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You experienced this memory on {memory.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{memory.memoryTitle}</p> <br/>
              <p>{memory.memoryText}</p>
            </div>
            <button
              onClick={() => handleRemoveMemory(memory)}
              >
                x
              </button>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/memories/${memory._id}`}
            >
              Comment on this memory
            </Link>
            {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
          </div>
        ))}
    </div>
  );
};

export default MemoryList;
