import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './SidebarContainer.module.scss';
import { AiOutlineClose as Cross } from 'react-icons/ai';
import Button from '../Button';
import { SidebarContext } from '../../contexts/SidebarContext';
import { c } from '../../utils/classNameParser';

const CROSS_SIZE = 20;

interface SidebarContainerProps {
  title: string;
  children: React.ReactNode;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({
  title,
  children,
}) => {
  const { sidebarIsOpen, setSidebarIsOpen } = useContext(SidebarContext);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = useCallback(
    (event: MouseEvent) => {
      const contentNode = contentRef.current;
      if (contentNode && !contentNode.contains(event.target as Node)) {
        setSidebarIsOpen(false);
      }
    },
    [setSidebarIsOpen]
  );

  useEffect(() => {
    if (sidebarIsOpen) {
      setVisible(sidebarIsOpen);
    } else {
      setTimeout(() => setVisible(sidebarIsOpen), 550);
    }
  }, [sidebarIsOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleContainerClick);

    return () =>
      document.removeEventListener('mousedown', handleContainerClick);
  }, [handleContainerClick]);

  return (
    <div
      className={c([
        styles['sidebar-container'],
        styles[`sidebar-container-${sidebarIsOpen ? 'open' : 'close'}`],
      ])}
      style={{
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <div
        ref={contentRef}
        className={c([
          styles['sidebar-container-content'],
          styles[
            `sidebar-container-content-${sidebarIsOpen ? 'open' : 'close'}`
          ],
        ])}
      >
        <div className={styles['sidebar-container-content-header']}>
          <p>{title}</p>
          <Button
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            color="white"
          >
            <Cross size={CROSS_SIZE} />
          </Button>
        </div>

        <div className={styles['sidebar-container-content-body']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
