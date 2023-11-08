import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export function NewsLetter() {
  return (
    <div className="flex justify-center bg-[url('/images/background.png')] px-4 md:px-0">
      <div className="flex items-center gap-20">
        <img src="/images/illustration4.svg" alt="standing man" className="hidden lg:block" />
        <div className="mb-10 mt-10 flex flex-col justify-center gap-10 lg:mt-0">
          <h3 className="text-2xl font-semibold text-white">Найкращі пропозиції для подорожей!</h3>
          <div className="relative">
            <Input
              type="text"
              className="rounded-2xl px-5 py-3"
              placeholder="Введіть адресу вашої електроної пошти..."
            />
            <Button className="absolute right-0 top-0 rounded-2xl" variant="secondary" size="icon">
              <ArrowRight />
            </Button>
          </div>
        </div>
        <img src="/images/illustration5.svg" alt="sitting man" className="hidden lg:block" />
      </div>
    </div>
  );
}
