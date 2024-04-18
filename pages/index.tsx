import React from "react";

// type TData = {
//   data: { userId: string; id: string; title: string; completed: string };
// };

type TProps = { message: string };

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const { title } = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    ).then((response) => response.json());
    // Pass data to the page via props
    return { props: { message: title } };
  } catch ({ message }) {
    console.error(message);
    // Pass data to the page via props
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}

const Index: React.FC<TProps> = ({ message }) => {
  console.log("FIND ME!");
  // useEffect(() => {
  //   if (message) {
  //     window.location.href = "/500";
  //     console.error("!!!");
  //   }
  // }, [message]);

  return <div>Incoming data: {message}</div>;
};

export default Index;
