import { useRouter } from 'next/router';
import React, { useCallback, useContext } from 'react';
import Button from '../../../shared/components/Button';
import { SidebarContext } from '../../../shared/contexts/SidebarContext';
import styles from './EmptyCartSidebar.module.scss';

const EmptyCartSidebar: React.FC = () => {
  const router = useRouter();
  const { setSidebarIsOpen } = useContext(SidebarContext);

  const handleCtaClick = useCallback(() => {
    router.push('/individual-items');
    setSidebarIsOpen(false);
  }, [router, setSidebarIsOpen]);

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
