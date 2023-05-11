import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 198px;

  .page-details {
    color: #fff;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
