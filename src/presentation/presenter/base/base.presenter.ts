export class BasePresenter<T> {
  constructor(private readonly formatFn: (data: T) => any) {}

  format(data: T): any {
    return this.formatFn(data);
  }
}
