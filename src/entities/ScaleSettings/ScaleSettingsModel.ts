import { MobXRepository } from '@/repository/MobXRepository';
import { IScaleSettings } from './IScaleSettings';

const DEFAULT_SCALE_SETTINGS: IScaleSettings = {
    host: '',
    port: 0,
};

interface IScaleSettingsModel {
    settings: IScaleSettings;
}

class ScaleSettingsModel implements IScaleSettingsModel {
    private settingsRepository = new MobXRepository<IScaleSettings>(
        DEFAULT_SCALE_SETTINGS,
        'scale-settings',
    );

    public get settings() {
        return this.settingsRepository.data || DEFAULT_SCALE_SETTINGS;
    }

    public set settings(settings: IScaleSettings) {
        this.settingsRepository.save(settings);
    }
}

export const scaleSettingsModel = new ScaleSettingsModel();
