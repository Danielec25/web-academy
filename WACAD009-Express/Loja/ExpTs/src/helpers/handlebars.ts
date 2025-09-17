    export function forEachNode(context: any[], options: any) {
      let result = '';

      for (let i = 0; i < context.length; i++) {
        const item = context[i];

        if (item.poweredByNodejs) {
          result += options.fn(item);
        }
      }

      return result;
    }
    
