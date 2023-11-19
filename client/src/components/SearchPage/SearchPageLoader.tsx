import { AirplaneIcon } from '@/ui/icons/icons';

export function SearchPageLoader() {
  return (
    <div className="mb-4 mt-10 flex h-screen items-center justify-center">
      <div className="2 w-full px-4  md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
        <div className="relative h-0 w-full rounded-3xl border-[2px] border-gray-500">
          <div className=" w-full ">
            <div className="animate-plane-line absolute -left-1 bottom-[-2px] h-1 rounded-3xl bg-secondary" />
            <div className="animate-plane-flight absolute bottom-[-20px] w-11 bg-background px-[2px]">
              <AirplaneIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
