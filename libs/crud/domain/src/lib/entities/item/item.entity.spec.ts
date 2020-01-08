import {Item} from "@smartsoft001/crud-domain";
import {IUser} from "@smartsoft001/users";
import {CreateItemEvent} from "../../feature-create-item/create-item.event";
import {UpdateItemEvent} from "../../feature-update-item/update-item.event";
import {UpdatePartialItemEvent} from "../../feature-update-partial-item/update-partial-item.event";
import {DeleteItemEvent} from "../../feature-delete-item/delete-item.event";

describe('crud-domain: ItemEntity', () => {
    it('should set param properties', () => {
        const model = {
            id: '12',
            test1: 123,
            test2: 'test'
        };

        const entity = new Item(model);

        Object.keys(model).forEach(key => {
            expect(entity[key]).toBe(model[key])
        });
    });

    it('should set id', () => {
        const id = 'id';

        const entity = new Item(id);

        expect(entity.id).toBe(id);
    });

    describe('create()', () => {
        const model = {
            id: '12',
            test1: 123,
            test2: 'test'
        };
        const entity = new Item(model);
        const user = {} as IUser;
        const spy = jest.spyOn(entity, "apply");

        entity.create(user);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new CreateItemEvent(entity, user));
    });

    describe('update()', () => {
        const model = {
            id: '12',
            test1: 123,
            test2: 'test'
        };
        const entity = new Item(model);
        const user = {} as IUser;
        const spy = jest.spyOn(entity, "apply");

        entity.update(user);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new UpdateItemEvent(entity, user));
    });

    describe('updatePartial()', () => {
        const model = {
            id: '12',
            test1: 123,
            test2: 'test'
        };
        const entity = new Item(model.id);
        const user = {} as IUser;
        const spy = jest.spyOn(entity, "apply");

        entity.updatePartial(model, user);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new UpdatePartialItemEvent({ ...model, id: model.id }, user));
    });

    describe('delete()', () => {
        const entity = new Item('test');
        const user = {} as IUser;
        const spy = jest.spyOn(entity, "apply");

        entity.delete(user);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new DeleteItemEvent('test', user));
    });
});
