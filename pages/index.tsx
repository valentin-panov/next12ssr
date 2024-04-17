import React from "react";

type TData = {
  data: { userId: string; id: string; title: string; completed: string };
};

// This gets called on every request
export async function getServerSideProps() {
  let data: string = "";
  // Fetch data from external API
  try {
    data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => response.json(),
    );
  } catch (e) {
    console.error(e);
  }

  // Pass data to the page via props
  return { props: { data } };
}

const Index: React.FC<TData> = ({ data }) => {
  return <div>Incoming data: {data.title}</div>;
};
export default Index;
