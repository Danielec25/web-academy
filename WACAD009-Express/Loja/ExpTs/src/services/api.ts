    import axios from 'axios';

    
    const API_URL = 'https://fakestoreapi.com';

  
    export interface Product {
      id: number;
      title: string;
      price: number;
      category: string;
      description: string;
      image: string;
    }

    
    export const getAllProducts = async (): Promise<Product[]> => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return []; 
      }
    };

    export const getProductById = async (id: string): Promise<Product | null> => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Erro ao buscar produto com ID ${id}:`, error);
        return null; 
      }
    };
    
