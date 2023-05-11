import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../@types/CartItem';
import {
  Actions,
  Item,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDeatails,
  Summary,
  TotalContainer,
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../@types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface CartItemProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      }))
    };

    await api.post('/orders', payload);
    setIsLoading(false);
    setIsOrderConfirmedModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsOrderConfirmedModalVisible(false);
  }

  return (
    <>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.139:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDeatails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>

                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDeatails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>

              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          loading={isLoading}
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>

      <OrderConfirmedModal
        visible={isOrderConfirmedModalVisible}
        onOk={handleOk}
      />
    </>
  );
}
