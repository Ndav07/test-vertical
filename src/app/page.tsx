"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/react";
import { useState } from "react";
import useDebounce from "~/hooks/use-debouce";
import Header from "./_components/header";
import Footer from "./_components/footer";

export default function Home() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [cod, setCod] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const debouncedSearch = useDebounce(search, 500);
  const debouncedCod = useDebounce(cod, 500);
  const {
    hasNextPage,
    hasPreviousPage,
    data: consultations,
    fetchNextPage,
    fetchPreviousPage,
  } = api.categories.findAll.useInfiniteQuery(
    {
      page: pagination.pageIndex,
      cod: debouncedCod && debouncedCod.length > 1 ? debouncedCod : undefined,
      title:
        debouncedSearch && debouncedSearch.length > 1
          ? debouncedSearch
          : undefined,
    },
    {
      getNextPageParam: (data) => String(data.nextPage),
      getPreviousPageParam: (data) => String(data.prevPage),
    },
  );

  return (
    <main className="flex h-screen w-screen flex-row overflow-x-hidden overflow-y-hidden bg-black">
      <div className="flex w-full flex-col items-center justify-between">
        <Header />
        <div className="sm:max-w-4/5 container mx-2 w-full sm:mx-12 2xl:mx-auto">
          <div>
            <DataTable
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              fetchNextPage={fetchNextPage}
              fetchPreviousPage={fetchPreviousPage}
              qtPages={consultations?.pages.length}
              columns={columns}
              data={
                consultations?.pages.flatMap((item) => item.categories) ?? []
              }
              cod={cod}
              setCod={setCod}
              pagination={pagination}
              setPagination={setPagination}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
