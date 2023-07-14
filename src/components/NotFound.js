import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  return (
    <div style={{ margin: '12px' }}>
      <h1>
        {error.status} - {error.statusText}
      </h1>
    </div>
  );
}
