import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import Button from '../../../shared/components/Button';
import { CartSidebarContext } from '../../../shared/contexts/CartSidebarContext';
import styles from './EmptyCartSidebar.module.scss';

const EmptyCartSidebar: React.FC = () => {
  const router = useRouter();
  const { setCartSidebarIsOpen } = useContext(CartSidebarContext);

  const handleCtaClick = useCallback(() => {
    router.push('/individual-items');
    setCartSidebarIsOpen(false);
  }, [router, setCartSidebarIsOpen]);

  return (
    <div className={styles['empty-cart-sidebar']}>
      <Button
        variant="fill"
        color="black"
        mode="fill-parent"
        onClick={handleCtaClick}
      >
        TIẾP TỤC MUA SẮM
      </Button>
    </div>
  );
};

export default EmptyCartSidebar;
