import { useToast } from '@chakra-ui/toast'
import { useCallback } from 'react';

const useShowToast = () => {
    const toast = useToast()
    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 4000,
            isClosable: true,
        });
    };
    return showToast;
}

export default useShowToast