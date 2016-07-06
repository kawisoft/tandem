import { fragment } from './index';
import expect from 'expect.js';
import { SelectEvent } from 'common/selection/events';
import BaseApplication from 'common/application/base';
import Selection from 'common/selection/collection';
import { FactoryFragment } from 'common/fragments';

describe(__filename + '#', function() {

  var app;

  beforeEach(async function() {
    app = BaseApplication.create({ fragments: [fragment] });
    await app.initialize();
  })

  it('defines "selection" property on application on selection event', function() {
    var item = { name: 'blarg' };
    app.bus.dispatch(SelectEvent.create(item));
    expect(app.selection.length).to.be(1);
  });

  it('only selects one item if multi is false', function() {
    var item = { name: 'blarg' };
    app.bus.dispatch(SelectEvent.create(item));
    expect(app.selection.length).to.be(1);
    app.bus.dispatch(SelectEvent.create(item));
    expect(app.selection.length).to.be(1);
  });

  it('selects multiple items if multi is true', function() {
    app.bus.dispatch(SelectEvent.create({ name: 'blarg' }));
    expect(app.selection.length).to.be(1);
    app.bus.dispatch(SelectEvent.create({ name: 'blarg' }, true));
    expect(app.selection.length).to.be(2);
    app.bus.dispatch(SelectEvent.create({ name: 'blarg' }));
    expect(app.selection.length).to.be(1);
  });

  it('removes an item from the selection if it already exists', function() {
    var item = { name: 'blarg' };
    app.bus.dispatch(SelectEvent.create(item));
    expect(app.selection.length).to.be(1);
    app.bus.dispatch(SelectEvent.create(item, true));
    expect(app.selection.length).to.be(0);
  });

  it('picks the correct collection type depending on the item type', function() {

    class DisplayCollection extends Selection {

    }

    class OtherCollection extends Selection {

    }

    app.fragmentDictionary.register(FactoryFragment.create('selectorCollection/display', DisplayCollection));
    app.fragmentDictionary.register(FactoryFragment.create('selectorCollection/other', OtherCollection));

    app.bus.dispatch(SelectEvent.create({ type: 'display' }));
    expect(app.selection).to.be.an(DisplayCollection);
    app.bus.dispatch(SelectEvent.create({ type: 'display' }, true));
    expect(app.selection).to.be.an(DisplayCollection);
    expect(app.selection.length).to.be(2);

    app.bus.dispatch(SelectEvent.create({ type: 'other' }, true));
    expect(app.selection).to.be.an(OtherCollection);
    expect(app.selection.length).to.be(1);

  });

  it('can deselect all be omitting item', function() {
    app.bus.dispatch(SelectEvent.create({ type: 'display' }));
    app.bus.dispatch(SelectEvent.create({ type: 'display' }, true));
    expect(app.selection.length).to.be(2);
    app.bus.dispatch(SelectEvent.create());
    expect(app.selection.length).to.be(0);
  });
});