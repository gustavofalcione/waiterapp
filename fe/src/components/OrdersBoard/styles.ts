import styled from "styled-components";

export const Board = styled.div`
  padding: 1rem;
  border: 1px solid rgba(204,204,204, .4);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  > header {
    padding: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;

  button {
    background: #fff;
    height: 8rem;
    border: 1px solid rgba(204,204,204, .4);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;

    strong {
      font-weight: 500;
    }

    span {
      font-size: .875rem;
      color: #666;
    }

    & + button {
      margin-top: 1.5rem;
    }
  }
`;
