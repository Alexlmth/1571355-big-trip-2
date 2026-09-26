export default class PointsModel {
  #points = [];
  #tripApiService = null;

  destinations = [];
  offers = [];
  isLoading = true;
  isLoadingError = false;

  constructor({ tripApiService }) {
    this.#tripApiService = tripApiService;
  }

  async init() {
    try {
      const [destinations, offers] = await Promise.all([
        this.#tripApiService.destinations(),
        this.#tripApiService.offers(),
      ]);

      this.destinations = destinations;
      this.offers = offers;
      this.#points = await this.#tripApiService.points(this.destinations, this.offers);
    } catch (err) {
      this.#points = [];
      this.destinations = [];
      this.offers = [];
      this.isLoadingError = true;
    } finally {
      this.isLoading = false;
    }
  }

  getPoints() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = points;
  }

  async updatePoint(updatedPoint) {
    const point = await this.#tripApiService.updatePoint(updatedPoint, this.destinations, this.offers);

    this.#points = this.#points.map((pointItem) =>
      pointItem.id === point.id ? point : pointItem
    );
  }

  addPoint(point) {
    this.#points = [
      point,
      ...this.#points,
    ];
  }

  deletePoint(pointId) {
    this.#points = this.#points.filter((point) => point.id !== pointId);
  }
}
