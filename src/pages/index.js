import React, { useRef } from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { Button, Container, Input, Label, Flex, Heading } from "theme-ui"



const BookmarksQuery = gql`{
  bookmark{
    id
    url
    desc
  }

}`

const AddBookmarkMutation = gql`
  mutation addBookmark($url: String!, $desc: String!){
    addBookmark(url: $url, desc: $desc) {
      url
    }
  }`

export default function Home() {
  const { loading, error, data, refetch } = useQuery(BookmarksQuery)
  const [addBookmark] = useMutation(AddBookmarkMutation)
  const urlRef = useRef()
  const descRef = useRef()
  let textField;
  let desc;
  const addBookmarkSubmit = () => {

    addBookmark({
      variables: {
        url: textField.value,
        desc: desc.value
      },
      refetchQueries: [{
        query: BookmarksQuery
      }]
    })
    console.log("bookmark value: ", textField.value)
    console.log("Description value: ", desc.value)
  }

  return (
    <Container sx={{ marginTop: 2 }} >
      <Flex sx={{flexDirection: "column",
      textAlign: "center"

    }} >

        <Heading>  
          ADD BOOKMARK
          </Heading>
        <br />
        <Heading> Netlify, Graphql, Faunadb </Heading>
        <br />
      </Flex>

      {/* <p>{JSON.stringify(data)}</p> */}
      <div>
        {/* <input type="text" placeholder="URL" ref={node => textField = node} /> */}
        {/* <input type="text" placeholder="Description" ref={node => desc = node} /> */}
        {/* <button onClick={() => addBookmarkSubmit()} >Add Bookmark</button> */}
      </div>
      <Flex as="form"
        onSubmit={async e => {
          e.preventDefault();

          await addBookmark({
            variables: {
              url: urlRef.current.value,
              desc: descRef.current.value
            }
          });
          urlRef.current.value = "";
          descRef.current.value = "";
          await refetch()

        }}


      >
        <Label sx={{ display: "flex" }} >

          <Input type="text" placeholder="URL" ref={node => textField = node} ref={urlRef} />
          <Input type="text" placeholder="Description" ref={node => desc = node} ref={descRef} />

        </Label>
        <Button sx={{ marginLeft: 1 }} >Submit</Button>


      </Flex>

      <Flex sx={{ flexDirection: "column" }} >
        {loading ? <Flex> Loading... </Flex> : null}
        {error ? <Flex> {error} </Flex> : null}
        {!loading && !error && (data.bookmark.map(d => (
          <li key={d.id} >
            <a href={d.url} > {d.desc} </a>
          </li>
        )))
        }</Flex>


    </Container>

  )
}
