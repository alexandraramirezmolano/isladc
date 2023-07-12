import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';
import { useMachine } from '@xstate/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { onChangeStep } from '@/app/features/ui.slice';
import { stepEnum } from '@/app/features/ui.slice';

export default function Search() {
  const { openDrawer } = useDrawer();
  const dispatch = useDispatch();
  const { step } = useSelector((state: RootState) => state.UI);

  return (
    <>
      <div className="2xl:ltr:pl-10 2xl:rtl:pr-10 4xl:ltr:pl-10 4xl:rtl:pr-10">
        <div className="relative z-10 mb-6 flex items-center justify-between">
          <div className="flex gap-6 3xl:gap-8">
            <div className=""></div>
            {/*{ step === stepEnum.CONTINUE && 
              <div className="mt-5">
                <Button
                  shape="rounded"
                  size="small"
                  variant="ghost"
                  color="gray"
                  onClick={() => dispatch(onChangeStep(stepEnum.START))}
                  className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none bg-dark"
                >
                  <OptionIcon className="relative h-auto w-[18px]" />
                </Button>
              </div>
            }*/}
          </div>
        </div>
        <Feeds />
      </div>

      <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
        {/* Additional content */}
      </div>
    </>
  );
}
