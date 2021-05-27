import { useRouter } from 'next/router';

import { Pagination as PaginationUI } from 'semantic-ui-react';
import queryString from 'query-string';

export default function Pagination({ totalGames, page, limit }) {
  const router = useRouter();
  const totalPage = Math.ceil(totalGames / limit);
  const urlParse = queryString.parseUrl(router.asPath);

  const goTopage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div className="pagination">
      <PaginationUI
        defaultActivePage={page}
        totalPages={totalPage}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, { activePage }) => goTopage(activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
