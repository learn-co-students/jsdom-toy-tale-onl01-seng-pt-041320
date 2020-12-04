class Api::V1::ToysController < ApplicationController


    def index
        @toys = Api::V1::Toy.all
        render json: @toys, except: [:created_at, :updated_at]
    end

    def create
        @toy = Api::V1::Toy.create(toy_params)
        @toy.likes = 0
        @toy.save
        
        render json: @toy, except: [:created_at, :updated_at]

    end

    def update
        @toy = Api::V1::Toy.find_by_id(params[:id])
        @toy.update(likes: @toy.likes + 1)
        render json: @toy, except: [:created_at, :updated_at]

    end

    private

    def toy_params
        params.require(:toy).permit(:name, :image)
    end

end