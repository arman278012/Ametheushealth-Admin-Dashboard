import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const AttachProducts = () => {
  return (
    <>
      <div className="overflow-x-auto p-5">
        <p className="font-bold text-xl mb-5">Attach Products</p>
        <div className="main-content-div bg-gray-300 p-5 w-full flex justify-between">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search data here..."
              className="p-3 border rounded-xl h-[45px] w-[300px]"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
            >
              Search
            </button>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search category here..."
              className="p-3 border rounded-xl h-[45px] w-[300px]"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex gap-10 p-5">
          <div className="w-[65%]">
            <Table className="min-w-full bg-white border border-gray-300]">
              <Thead>
                <Tr className=" bg-gray-200 w-[100%]">
                  <Th className="py-2 px-4 border-b w-[10%]">
                    <input type="checkbox" />
                  </Th>
                  <Th className="py-2 px-4 border-b text-start">Name</Th>
                  <Th className="py-2 px-4 border-b text-start">Id</Th>
                  <Th className="py-2 px-4 border-b text-start">Generic</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td className="py-2 px-4 border-b text-center">
                    <input type="checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    Arman Ali
                  </Td>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    Arman Ali
                  </Td>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    Arman Ali
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
          <div className="w-[35%]">
            <Table className="min-w-full bg-white border border-gray-300]">
              <Thead>
                <Tr className=" bg-gray-200 w-[100%]">
                  <Th className="py-2 px-4 border-r text-start">Name</Th>
                  <Th className="py-2 px-4 border-r text-start">Id</Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    Arman Ali
                  </Td>

                  <Td className="py-2 px-4 border-b text-start text-[14px]">
                    Arman Ali
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttachProducts;
